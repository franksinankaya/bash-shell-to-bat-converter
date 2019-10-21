import {CommandHandler} from './command-handler';
import {splitParams} from './util';

export class RmHandler implements CommandHandler {

    constructor(private defaultHandler: (command: any) => string) {
    }

    handle(command: any): string {
        const {singleDashParams, doubleDashParams, argList} = splitParams(command);
        const winParams: string[] = [];
        singleDashParams.forEach(suffix => {
            if (suffix.text.indexOf('r') >= 0) {
                winParams.push('/S')
            }
        });
        return `del ${winParams.join(' ')} ${argList.map(this.defaultHandler).join(' ')}`; // converting assures paths are fixed..
    }
}
