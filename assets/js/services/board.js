export default function () {
  return (function () {
    let currentTitle;
    let newTitle;

    return {
      getCurrentTitle() {
        return this.currentTitle;
      },

      setCurrentTitle(title) {
        this.currentTitle = title;
      },

      handleInputUpdates(updateValue) {
        console.log(updateValue);
      },
    };
  })();
}
