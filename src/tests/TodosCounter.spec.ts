import { mount, VueWrapper } from '@vue/test-utils'
import TodosCounter from '../components/TodosCounter.vue'

let wrapper = {} as VueWrapper<any>;
const counter = '2';

describe('TodosCounter', () => {
    beforeEach(() => {
        wrapper = mount(TodosCounter, {
            props: {
                counter,
            }
        })
    })

    it('should display todos count', () => {
        expect(wrapper.find('.counter').text()).toEqual(counter);
    })
})