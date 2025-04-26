import Mention from '@tiptap/extension-mention';
import tippy, { Instance, GetReferenceClientRect } from 'tippy.js';
import { SuggestionProps, SuggestionKeyDownProps } from '@tiptap/suggestion';
import { ReactRenderer } from '@tiptap/react';
import MentionList, { IMentionListRef, IMentionItem } from '../MentionList/MentionList';

interface IMentionNodeAttrs {
  id: string;
  name: string;
}

export const createMentionExtension = (mentionItems: IMentionItem[]) => {
  return Mention.configure({
    HTMLAttributes: {
      class: 'mention'
    },

    suggestion: {
      char: '@',
      items: ({ query }: { query: string }) => {
        return mentionItems
          .filter((mentionItem) => mentionItem?.name?.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 5);
      },

      render: () => {
        let component: ReactRenderer & { ref: IMentionListRef | null };
        let popup: Instance;
        return {
          onStart: (suggestionProps: SuggestionProps<IMentionNodeAttrs>) => {
            component = new ReactRenderer(MentionList, {
              props: suggestionProps,
              editor: suggestionProps.editor
            }) as ReactRenderer & { ref: IMentionListRef | null };

            if (!suggestionProps.clientRect) {
              return;
            }

            popup = tippy(document.body, {
              getReferenceClientRect: () => suggestionProps.clientRect?.() ?? new DOMRect(),
              appendTo: () => document.body,
              content: component.element,
              showOnCreate: true,
              interactive: true,
              trigger: 'manual',
              placement: 'bottom-start'
            });
          },

          onUpdate: (suggestionProps: SuggestionProps<IMentionNodeAttrs>) => {
            component.updateProps(suggestionProps);

            if (!suggestionProps.clientRect) {
              return;
            }

            popup.setProps({
              getReferenceClientRect: suggestionProps.clientRect as GetReferenceClientRect
            });
          },
          onKeyDown: (suggestionProps: SuggestionKeyDownProps) => {
            if (suggestionProps.event.key === 'Escape') {
              popup.hide();
              return true;
            }

            return component.ref?.onKeyDown({ event: suggestionProps.event }) ?? false;
          },
          onExit: () => {
            popup.destroy();
            component.destroy();
          }
        };
      }
    }
  });
};
