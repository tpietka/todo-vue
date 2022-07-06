import { setActivePinia, createPinia } from 'pinia'
import { useSettings } from '../stores/settings'
import { toRefs } from 'vue';

describe('Settings Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('sets dark mode', () => {
    const { theme } = toRefs(useSettings());
    const { setDark } = useSettings();
    expect(theme.value).toBe('light');
    setDark();
    expect(theme.value).toBe('dark');
  })

  it('sets light mode', () => {
    const { theme } = toRefs(useSettings());
    theme.value = 'dark';
    const { setLight } = useSettings();
    expect(theme.value).toBe('dark');
    setLight();
    expect(theme.value).toBe('light');
  })
})