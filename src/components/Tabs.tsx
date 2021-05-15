// @ts-nocheck
// Source: https://blog.brettsnaidero.com/tabs/ with some modification

import React from "react";
import {
  Switch,
  Route,
  Redirect,
  matchPath,
  useLocation,
  useHistory,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import "./Tabs.css";

const debounce = (func, wait, immediate) => {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const Underline = ({ refs, activeRoute, finishAnimating, animating }) => {
  const [{ x, width }, setAttributes] = React.useState({
    x: 0,
    width: 0,
  });

  const updateAttributes = React.useCallback(() => {
    if (refs && refs[activeRoute]) {
      setAttributes({
        x: refs[activeRoute].current.offsetLeft,
        width: refs[activeRoute].current.getBoundingClientRect().width,
      });
    }
  }, [activeRoute, refs]);

  // Update attributes if active route changes (or refs change)
  React.useEffect(() => {
    updateAttributes();
  }, [activeRoute, refs, updateAttributes]);

  // After window resize, recalculate
  React.useEffect(() => {
    const recalculateAttrs = debounce(() => {
      updateAttributes();
    }, 500);

    window.addEventListener("resize", recalculateAttrs);
    return () => {
      window.removeEventListener("resize", recalculateAttrs);
    };
  });

  return (
    <motion.div
      className="tabs-list__underline"
      animate={{
        x,
        width,
      }}
      style={{
        opacity: animating ? 1 : 0,
      }}
      onAnimationComplete={finishAnimating}
    />
  );
};

const Tab = React.forwardRef(
  ({ active, item, animating, startAnimating }, ref) => {
    const history = useHistory();
    return (
      <li className="tabs-list__item" key={`tab-${item.route}`}>
        <div
          className={`tabs-list__tab ${active ? "active" : "inactive"} ${
            animating ? "animating" : ""
          }`}
          ref={ref}
          onClick={() => {
            history.replace(`${item.route}`);
            startAnimating();
          }}
        >
          {item.name}
        </div>
      </li>
    );
  }
);

const Tabs = ({ items }) => {
  const [animating, setAnimating] = React.useState(false);

  const tabRefs = items.reduce((acc, item) => {
    acc[item.route] = React.createRef();
    return acc;
  }, {});

  const location = useLocation();

  // Find active path
  const active = items.find((item) =>
    matchPath(location.pathname, {
      path: `/${item.route}`,
      exact: true,
    })
  );

  const activeRoute = active && active.route;

  return (
    <React.Fragment>
      <div className="tabs">
        <ul role="tablist" aria-orientation="horizontal" className="tabs-list">
          {items.map((item) => (
            <Tab
              key={item.route}
              location={location}
              item={item}
              ref={tabRefs[item.route]}
              active={activeRoute === item.route}
              animating={animating}
              startAnimating={() => setAnimating(true)}
            />
          ))}
        </ul>
        <Underline
          refs={tabRefs}
          activeRoute={activeRoute}
          finishAnimating={() => setAnimating(false)}
          animating={animating}
        />
      </div>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          {items.map((item) => (
            <Route
              key={item.route}
              path={`/${item.route}`}
              render={() => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {item.render()}
                </motion.div>
              )}
            />
          ))}
          {/*
            Need to wrap the redirect in a motion component with an "exit" defined
            https://www.framer.com/api/motion/animate-presence/#animating-custom-components
          */}
          <Route
            key="redirection"
            render={() => (
              <motion.div exit={{ opacity: 0 }}>
                <Redirect to={items[0] ? `/${items[0].route}` : "/"} />
              </motion.div>
            )}
          />
        </Switch>
      </AnimatePresence>
    </React.Fragment>
  );
};

export default Tabs;
