import React from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import redux from "https://cdn.skypack.dev/redux@4.0.5";
import reactRedux, {
  Provider,
  useDispatch,
  useSelector,
} from "https://cdn.skypack.dev/react-redux@7.2.2";
import ReduxjsToolkit, {
  createSlice,
  configureStore,
} from "https://cdn.skypack.dev/@reduxjs/toolkit@1.4.0";

const moment = window["moment"];

const { createElement, useEffect } = React;

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
  },
  reducers: {
    setBlogs(state, action) {
      state.blogs = [...action.payload];
    },
  },
});

const blogActions = blogSlice.actions;

const store = configureStore({
  reducer: { blogs: blogSlice.reducer },
});

const App = () => {
  const dispatch = useDispatch();
  const allBlogs = useSelector((state) => state.blogs.blogs);

  useEffect(async () => {
    let all_blogs = [];
    const headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    fetch(`${API_URL}/blogs`, {
      method: "GET",
      mode: "cors",
      headers,
    })
      .then(async (response) => {
        if (response.ok) {
          all_blogs = await response.json();

          dispatch(blogActions.setBlogs(all_blogs));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let renderList = () => {
    return createElement(
      "label",
      { className: "nothing-yet" },
      "Sorry, no blogs uploaded yet!"
    );
  };
  if (allBlogs.length > 0) {
    renderList = allBlogs.map((blog) => {
      const { _id, title, body, image, date, author, __v, likes } = blog;

      let ref = "blogDetails.html?id=" + _id;
      return createElement(
        "div",
        { className: "blog" },
        createElement("img", { src: image, alt: "blog" }),
        createElement("label", { className: "blog-title" }, title),
        createElement(
          "div",
          { className: "blog-tiny-details" },
          createElement(
            "label",
            { className: "blog-date" },
            ` ${moment(date, "YYYY-MM-DDTHH:mm:ssZ").fromNow()}`
          ),
          createElement(
            "div",
            { className: "blog-reactions" },
            createElement(
              "label",
              null,
              createElement("i", { className: "fa-solid fa-comments" }, ""),
              24
            ),
            createElement(
              "label",
              null,
              createElement("i", { className: "fa-solid fa-thumbs-up" }, ""),
              likes ? likes.length : 0
            )
          )
        ),
        createElement(
          "label",
          { className: "blog-date" },
          author.toUpperCase()
        ),
        createElement("div", { className: "blue-line" }),
        createElement("p", {
          dangerouslySetInnerHTML: {
            __html: `${body.substring(0, 135)}...`,
          },
        }),
        createElement("a", { href: ref, className: "blog-full" }, "READ MORE")
      );
    });
  }

  return renderList;
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("blogsContainer")
);
