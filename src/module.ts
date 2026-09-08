import { PanelPlugin } from '@grafana/data';
import { PanelOptions } from './types';
import { InitialValidator } from './components';

export const plugin = new PanelPlugin<PanelOptions>(InitialValidator).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'url',
      name: 'Image URL',
      defaultValue: 'https://',
    });
});
