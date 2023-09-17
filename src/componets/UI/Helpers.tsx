import useMainStore from "../../store/main";

const Helpers = () => {
  const { helpers, toggleHelpers } = useMainStore();
  return (
    <label htmlFor="helpers">
      Enable help
      <input
        onChange={() => toggleHelpers(!helpers)}
        style={{ marginLeft: "5px" }}
        checked={helpers}
        id="helpers"
        type="checkbox"
      ></input>
    </label>
  );
};

export default Helpers;
