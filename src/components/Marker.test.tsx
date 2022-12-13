import Marker from "./Marker";
import { mount, configure } from "enzyme";
import * as Enzyme from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
import { act } from "react-test-renderer";
configure({ adapter: new Adapter() });

it("show green for ok signal", () => {
  const component = mount(
    <Marker dataBit={"1"} isComplete={false} label={"1"} />
  );

  component.setProps({ dataBit: "1", isComplete: true, label: "1" });
  let html = component.html();
  expect(html).toEqual(
    '<div style="background-color: green;" class="rounded-full w-12 h-12 ">1</div>'
  );
});

it("show yellow for unstable signal", () => {
  const component = mount(
    <Marker dataBit={"1"} isComplete={false} label={"1"} />
  );

  component.setProps({ dataBit: "0", isComplete: false, label: "1" });
  component.setProps({ dataBit: "1", isComplete: true, label: "1" });
  let html = component.html();

  expect(html).toEqual(
    '<div style="background-color: yellow;" class="rounded-full w-12 h-12 ">1</div>'
  );
});

it("show red for broken signal", () => {
  const component = mount(
    <Marker dataBit={"0"} isComplete={true} label={"1"} />
  );
  let html = component.html();

  expect(html).toEqual(
    '<div style="background-color: red;" class="rounded-full w-12 h-12 ">1</div>'
  );
});
