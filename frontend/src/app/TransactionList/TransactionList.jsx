import React from "react";
import Transaction from "../transaction/Transaction";
import * as _ from 'lodash'
import { mccDecoder } from '../chart/Chart'
import basket from '../transaction/basket.svg'
import burger from '../transaction/burger.svg'
import cash from '../transaction/cash.svg'
import creditCard from '../transaction/creditCard.svg'
import development from '../transaction/development.svg'

const TransactionList = ({ data }) => {
    let transactionsArray = []
    const decoder = require('../chart/Chart')

    const imgSrc = ( mcc ) => {
      if (mcc == '0') { return creditCard }
      else if (mcc == '5814') { return burger }
      else if (mcc == '6011') { return cash }
      else if (mcc == '7372') { return development }
      else { return basket }
    }

    const name = ( merchantName, operationType ) => {
      if (merchantName) { return merchantName }
      else if (operationType == 'DEBIT') { return 'Списание' }
      else { return 'Пополнение' }
    }

    const value = ( amount, operationType ) => {
      if (operationType == 'DEBIT') { return '-' + amount + ' руб.' }
      else { return '+' + amount + ' руб.' }
    }

    const dateConverter = (data, date) => {
        for (let i = 0; i < data.length; i++) {
          let tranDate
          tranDate = new Date(data[i].date)
          if (data[i].tranDate) {
            data[i].tranDate = tranDate.toUTCString()
            data[i].monthNumber = tranDate.getUTCMonth()
            data[i].dayNumber = tranDate.getUTCDate()
          } else {
            data[i].date = tranDate.toUTCString()
            data[i].monthNumber = tranDate.getUTCMonth()
            data[i].dayNumber = tranDate.getUTCDate()
          } 
        }
        transactionsArray = _.orderBy(data, 'date').reverse()
        console.log(transactionsArray)
        // return _.groupBy(data, 'monthNumber')[date]
      }
      dateConverter(data)
    return(
        <>{transactionsArray.map((i, j) => {return(
        <Transaction
            key={j}
            // nameTransaction={i.operationType}
            nameTransaction={name(i.merchantName, i.operationType)}
            sphereTransaction={mccDecoder(String(i.MCC))}
            mccImg={imgSrc(i.MCC)}
            valueTransaction={value(i.amount, i.operationType)}
        />)})}</>
    )
}

export default TransactionList