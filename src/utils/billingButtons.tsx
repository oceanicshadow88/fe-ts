import React from 'react';
import { RiBillLine, RiHistoryFill } from 'react-icons/ri';
import { BiDetail } from 'react-icons/bi';
import { MdOutlineUnsubscribe } from 'react-icons/md';

export const paymentButtons = {
  payment: [
    {
      name: 'Overview',
      url: `/billing/info/overview`,
      icon: <RiBillLine />
    },
    {
      name: 'Billing details',
      url: `/billing/info/detail`,
      icon: <BiDetail />
    },
    {
      name: 'Billing history',
      url: `/billing/info/history`,
      icon: <RiHistoryFill />
    },
    {
      name: 'Manage subscriptions',
      url: `/billing/info/subscription`,
      icon: <MdOutlineUnsubscribe />
    }
  ]
};
