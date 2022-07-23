import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BinanceSmartChainService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async tokens(address: string) {
    console.log('Service Started: listTransactions');
    return await firstValueFrom(
      // this.httpService.get(
      //   `https://api.bscscan.com/api?module=account&action=balancehistory&address=${address}&blockno=2000000&apikey=${this.configService.get(
      //     'BSC_API_KEY',
      //   )}`,
      // ),
      this.httpService.get(
        `https://api.bscscan.com/api?module=account&action=balance&address=${address}&apikey=${this.configService.get(
          'BSC_API_KEY',
        )}`,
      ),
    )
      .then((response) => {
        console.log('End: listTransactions', response.data);
        // if (response.data && response.data.result.length > 0) {
        //   let responseList = [];
        //   for (const transaction of response.data.result) {
        //     responseList.push({
        //       timeStamp: transaction['timeStamp'],
        //       from: transaction.from,
        //       to: transaction.to,
        //       contractAddress: transaction.contractAddress,
        //       hash: transaction.hash,
        //     });
        //   }
        //   console.log('Service Ended: listTransactions');
        //   return responseList;
        // }
      })
      .catch((error) => {
        console.log('error', error.message);
        return [];
      });
  }

  async listTransactions(address: string, page: number, offset: number) {
    console.log('Service Started: listTransactions');
    return await firstValueFrom(
      this.httpService.get(
        `https://api.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=${offset}&sort=asc&apikey=${this.configService.get(
          'BSC_API_KEY',
        )}`,
      ),
    )
      .then((response) => {
        console.log('End: listTransactions');
        if (response.data && response.data.result.length > 0) {
          let responseList = [];
          for (const transaction of response.data.result) {
            responseList.push({
              timeStamp: transaction['timeStamp'],
              from: transaction.from,
              to: transaction.to,
              contractAddress: transaction.contractAddress,
              hash: transaction.hash,
            });
          }
          console.log('Service Ended: listTransactions');
          return responseList;
        }
      })
      .catch((error) => {
        console.log('error', error.message);
        return [];
      });
  }

  async transaction(transactionId: string) {
    //   console.log('Service Started: transaction');
    //   return await firstValueFrom(
    //     this.httpService.get(
    //       `https://api.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${this.configService.get(
    //         'BSC_API_KEY',
    //       )}`,
    //     ),
    //   )
    //     .then((response) => {
    //       if (response.data && response.data.result.length > 0) {
    //         let responseList = [];
    //         for (const transaction of response.data.result) {
    //           responseList.push({
    //             timeStamp: transaction['timeStamp'],
    //             from: transaction.from,
    //             to: transaction.to,
    //             contractAddress: transaction.contractAddress,
    //             hash: transaction.hash,
    //           });
    //         }
    //         console.log('Service Ended: transaction');
    //         return responseList;
    //       }
    //     })
    //     .catch((error) => {
    //       console.log('error', error.message);
    //       return [];
    //     });
  }
}
