import axios from "axios";
import { shallowMount } from "@vue/test-utils";
import Feed from "@/components/Feed.vue";

jest.mock("axios");

describe("Feed.vue", () => {
  it("displays feed card after http call", async () => {
    // GIVEN
    const feedUrl = "feedUrl";
    const response = { id: "feedID", title: "title", entries: [{ summary: "feed summary" }] };
    axios.get.mockResolvedValue({ data: response });

    // WHEN
    const wrapper = shallowMount(Feed, {
      propsData: { feedUrl },
      stubs: ["router-link", "router-view"]
    });

    // THEN
    await wrapper.vm.$nextTick();
    expect(axios.get.mock.calls[0]).toContain("/feed/latest?url=feedUrl");
    expect(wrapper.element).toMatchSnapshot();
  });
});
