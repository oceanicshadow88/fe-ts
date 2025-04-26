/* eslint-disable no-unsafe-finally */
import React from 'react';
import { createLabel, removeLabel } from '../../../api/label/label';
import { ILabelData } from '../../../types';
import MultiSelectDropdownV2 from '../../FormV2/MultiSelectDropdownV2/MultiSelectDropdownV2';

interface IPropsLabel {
  ticketInfo: any;
  isDisabled: boolean;
  updateTicketTags: (tags: ILabelData[] | undefined) => void;
}

export default function LabelFieldsV2(props: IPropsLabel) {
  const { ticketInfo, isDisabled, updateTicketTags } = props;

  const removeLabelFromList = async (label: any) => {
    if (!ticketInfo.id || !label.id) {
      return;
    }
    try {
      await removeLabel(ticketInfo.id, label.id);
    } finally {
      if (!ticketInfo.tags) {
        return;
      }
      const filteredLabelList = ticketInfo.tags.filter((item) => item.name !== label.name);
      updateTicketTags(filteredLabelList);
    }
  };

  const onClickSave = async (label: string) => {
    if (!ticketInfo.id) {
      return;
    }
    await createLabel(ticketInfo.id, {
      name: label,
      slug: label.replace(' ', '-')
    });
  };

  return (
    <MultiSelectDropdownV2
      label="Labels (WIP)"
      name="labels"
      onValueChanged={() => {}}
      options={ticketInfo?.tags || []}
      onLabelDelete={removeLabelFromList}
      onLabelAdd={onClickSave}
      isDisabled={isDisabled}
    />
  );
}
