import "react-native-gesture-handler";
import { Provider } from "react-redux";
import AppNavigation from "@/navigation";
import store from "@/store";
import CounterController from "@/components/counter";
export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
      <CounterController/>
    </Provider>
  );
}
