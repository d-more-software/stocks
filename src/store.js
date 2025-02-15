import { configureStore } from "@reduxjs/toolkit";
import stocksSlice from "./slices/stocks/stocksSlice";
import indexesSliceReducer from "./slices/indexes/indexesSlice";
import forexSliceReducer from "./slices/forex/forexSlice";
import appSliceReducer from "./slices/app/appSlice";
import savedSliceReducer from "./slices/saved/savedSlice";

const store = configureStore({
	reducer: {
		stocks: stocksSlice,
		indexes: indexesSliceReducer,
		forex: forexSliceReducer,
		app: appSliceReducer,
		saved: savedSliceReducer,
	},
});

export default store;
