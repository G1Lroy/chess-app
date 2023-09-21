import useMainStore from "../../store/main";
import "./../../assets/styles/Helpers.css";

const Helpers = () => {
  const { helpers, toggleHelpers } = useMainStore();
  return (
    <label className="helpers" htmlFor="helpers">
      <input onChange={() => toggleHelpers(!helpers)} checked={helpers} id="helpers" type="checkbox"></input>
      Enable help
    </label>
  );
};

export default Helpers;
