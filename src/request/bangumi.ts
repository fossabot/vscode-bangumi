import * as vscode from "vscode";
import Axios from "./instance";
import { AxiosResponse } from "axios";
import { BangumiUrl, BANGUMI_WEEK } from './bangumi_url';
import { isEmptyArray, isEmptyObject } from '../utils/type';
import { BangumiCache, WeekBangumiCache } from './cache';
import {
    BangumisResponse,
    WeekBangumiData,
    WeekBangumiResponse,
    BangumisData,
    isSuccess
} from './structure';



/**
 * HTTP Request Gets all bangumi
 *
 * @param callback
 * @async
 * @author sdttttt
 */
export async function getAllBangumi(burl: BangumiUrl): Promise<BangumisData | undefined> {

    const url: string = burl.build().finalUrl;

    const cacheData: BangumisData | undefined = BangumiCache.get(url);
    let result: BangumisData | undefined = cacheData;

    if (!cacheData) {
        const res: AxiosResponse<BangumisResponse> =
            await Axios.get<any, AxiosResponse<BangumisResponse>>(url);

        const bangumisResponse: BangumisResponse = res.data;
        isSuccess(bangumisResponse);

        if (isEmptyObject(bangumisResponse.data) || isEmptyArray(bangumisResponse.data.list)) {
            vscode.window.showInformationMessage(`
                获取数据为空🤔
            `);
            return;
        }
        result = bangumisResponse.data;
        BangumiCache.set(url, result);
    }

    return result;
}



/**
 * Gets week bangumi
 *
 * @param {(data: Array<WeekBangumiData>) => void} callback
 * @async
 * @author sdttttt
 */
export async function getWeekBangumi(): Promise<Array<WeekBangumiData> | undefined> {

    const cacheData: Array<WeekBangumiData> | undefined =
        WeekBangumiCache.get(BANGUMI_WEEK);

    let result: Array<WeekBangumiData> | undefined = cacheData;

    if (!cacheData) {
        const res: AxiosResponse<WeekBangumiResponse> =
            await Axios.get<any, AxiosResponse<WeekBangumiResponse>>(BANGUMI_WEEK);

        const weekBangumiResponse = res.data;
        isSuccess(weekBangumiResponse);

        if (isEmptyArray(weekBangumiResponse.result)) {
            vscode.window.showInformationMessage(`
            获取数据为空🤔
        `);
            return;
        }
        result = weekBangumiResponse.result;
        WeekBangumiCache.set(BANGUMI_WEEK, result);
    }


    return result;
}