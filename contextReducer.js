export const initialState = {
  themeColor: "dark",
  userData: {},
  productData: [],
  loadingData: true,
};

function contextReducer(state = initialState, action) {
  switch (action.type) {
    case "TOOGLE_THEME":
      return {
        ...state,
        themeColor: state.themeColor === "light" ? "dark" : "light",
      };
    case "ADD_USER_DATA":
      return {
        ...state,
        userData: action.data,
      };
    case "ADD_PRODUCT_DATA":
      return {
        ...state,
        productData: action.data,
      };
    case "SET_LOADING_DATA":
      return {
        ...state,
        loadingData: action.data,
      };
    default:
      return state;
  }
}

export default contextReducer;
