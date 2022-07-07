import { mount, VueWrapper } from '@vue/test-utils'
import TodoDate from '../components/TodoDate.vue'
import { getCurrentDate, formatDateToDDMMYYYY, getTomorrowsDate } from '../helpers/date';

let wrapper = {} as VueWrapper<any>;
let done = false;
let date = getCurrentDate();
const redColor = 'text-red-500';
const darkSlateColor = 'dark:text-slate-100';
const slateColor = 'text-slate-800';
const deadlineIcon = 'schedule';
const doneIcon = 'task_alt';

describe('TodosCounter', () => {
  beforeEach(() => {
    wrapper = mount(TodoDate, {
      props: {
        done,
        date,
      }
    })
  })

  it('should display red color on deadline', () => {
    expect(wrapper.find('.date-container').classes()).toContain(redColor);
  })

  it('should display other color without deadline', () => {
    date = getTomorrowsDate();
    wrapper = mount(TodoDate, {
      props: {
        done,
        date,
      }
    })
    expect(wrapper.find('.date-container').classes()).toContain(slateColor || darkSlateColor);
  })

  it('should display date in correct format', () => {
    date = '2022/12/31';
    wrapper = mount(TodoDate, {
      props: {
        done,
        date,
      }
    })
    expect(wrapper.find('.date').text()).toBe(formatDateToDDMMYYYY(date));
  })

  it('should display correct icon on todo not done', () => {
    expect(wrapper.find('.material-icons').text()).toBe(deadlineIcon);
  })

  it('should display correct icon on todo done', () => {
    done = true;
    wrapper = mount(TodoDate, {
      props: {
        done,
        date,
      }
    })
    expect(wrapper.find('.material-icons').text()).toBe(doneIcon);
  })
})