import { LightningElement, wire } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';

import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import { reduceErrors } from 'c/ldsUtils';

const COLUMNS = [
  {
    label: 'Account Name',
    fieldName: NAME_FIELD.fieldApiName,
    type: 'text'
  },
  {
    label: 'Account Revenue',
    fieldName: REVENUE_FIELD.fieldApiName,
    type: 'currency'
  },
  {
    label: 'Industry',
    fieldName: INDUSTRY_FIELD.fieldApiName,
    type: 'text'
  }
];


export default class AccountList extends LightningElement {
  columns = COLUMNS;
  @wire(getAccounts)
  accounts;

  get errors() {
    return (this.accounts.error) ? reduceErrors(this.accounts.error) : [];
  }
}