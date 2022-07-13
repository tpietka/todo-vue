import { mount, VueWrapper } from '@vue/test-utils'
import DatePicker from '../components/DatePicker.vue'
import { getFirstDayOfMonth } from '../helpers/date';

let wrapper = {} as VueWrapper<any>;

describe('DatePicker', () => {
  beforeEach(() => {
    wrapper = mount(DatePicker)
  })

  it('should emit selected day', async () => {
    const date = wrapper.find('.date');
    expect(date.exists()).toBe(true);
    await date.trigger('click');
    expect(wrapper.emitted().updateDate[0]).toEqual([getFirstDayOfMonth()]);
    expect(wrapper.emitted().hideDatePicker).toBeDefined();
  })
})