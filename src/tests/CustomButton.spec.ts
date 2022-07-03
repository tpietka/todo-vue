import { mount, VueWrapper } from '@vue/test-utils'
import CustomButton from '../components/CustomButton.vue'

let wrapper = {} as VueWrapper<any>;
const label = 'Label';
const id = 'btn'
const routeName = 'Route'

const mockPush = jest.fn();

jest.mock('vue-router', () => ({
  useRoute: jest.fn(),
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}));

describe('CustomButton', () => {
  beforeEach(() => {
    wrapper = mount(CustomButton, {
      props: {
        routeName,
        label,
        id
      }

    })
  })

  it('calls router.push to passed route on button click', async () => {
    const buttonDiv = wrapper.find(`#${id}`);
    await buttonDiv.trigger('click');
    expect(buttonDiv.text()).toEqual(label);
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith({ name: routeName });
  });
})