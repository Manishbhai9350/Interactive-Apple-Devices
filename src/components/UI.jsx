import Item from "./Item";
import { useAtom } from "jotai";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SelectedAtom } from "../Utils/HoverAtom";

const UI = () => {
  const [selectedItem, setSelectedItem] = useAtom(SelectedAtom);

  useGSAP(() => {
    const next = document.querySelector(
      ".ui-name-child.upcoming"
    );
    const current = document.querySelector(
      ".ui-name-child.current"
    );
    if (selectedItem) {
      next.innerHTML = `<h1>${selectedItem}</h1>`;
    } else {
      next.innerHTML = `<h1>Select  A Device</h1>`;
    }
    gsap.to(current, {
      top: "-100%",
      onComplete() {
        gsap.set(current, {
          top: "100%",
        });
        current?.classList.remove("current");
        current?.classList.add("upcoming");
      },
    });
    gsap.to(next, {
      top: 0,
      onComplete() {
        next?.classList.remove("upcoming");
        next?.classList.add("current");
      },
    });
  }, [selectedItem]);

  return (
    <>
      <div className="ui ui-name">
        <div style={{ top: 0 }} className="current ui-name-child">
          <h1></h1>
        </div>
        <div style={{ top: "100%" }} className="upcoming ui-name-child">
          <h1></h1>
        </div>
      </div>
      <div className="ui ui-buttons">
        {["ipad", "macbook", "iphone"].map((item, index) => {
          return (
            <Item
              selected={selectedItem}
              key={index}
              name={item}
              onClick={() => {
                if (selectedItem == item) {
                  setSelectedItem("");
                } else {
                  setSelectedItem(item);
                }
              }}
            />
          );
        })}
      </div>
      <div className="links">
        <div className="link">
          <a
            target="_blank"
            href="https://github.com/Manishbhai9350/3d-mac-apple-ipad-interaction"
          >
            GitHub
          </a>
        </div>
      </div>
    </>
  );
};

export default UI;
