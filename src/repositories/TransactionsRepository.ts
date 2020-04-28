import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactionIncome = await this.find({
      where: { type: 'income' },
    });
    const income = transactionIncome.reduce(
      (accumulator, currentValue) => accumulator + currentValue.value,
      0,
    );

    const transactionOutcome = await this.find({
      where: { type: 'outcome' },
    });
    const outcome = transactionOutcome.reduce(
      (accumulator, currentValue) => accumulator + currentValue.value,
      0,
    );

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }
}

export default TransactionsRepository;
