import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useState, useEffect, Fragment } from "react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { systemTheme, theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const variants = {
    initial: { scale: 0.6, rotate: 90 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
    whileTap: { scale: 0.95, rotate: 15 },
  };

  const sunVariants = {
    initial: { scale: 1.5 },
    animate: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
    whileTap: { scale: 0.95, rotate: 15 },
  };

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <Fragment>
          <motion.div
            initial="initial"
            animate="animate"
            whileTap="whileTap"
            variants={sunVariants}
            className="hidden lg:block"
          >
            <BsFillSunFill
              className="text-2xl text-yellow-500 "
              role="button"
              onClick={() => setTheme("light")}
            />
          </motion.div>
          <motion.div className="block lg:hidden">
            <BsFillSunFill
              className="text-2xl text-yellow-500 "
              role="button"
              onClick={() => setTheme("light")}
            />
          </motion.div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <motion.div
            initial="initial"
            animate="animate"
            whileTap="whileTap"
            variants={variants}
            className="hidden lg:block"
          >
            <BsFillMoonFill
              className="text-2xl text-white "
              role="button"
              onClick={() => setTheme("dark")}
            />
          </motion.div>
          <motion.div className="block lg:hidden">
            <BsFillMoonFill
              className="text-2xl text-white "
              role="button"
              onClick={() => setTheme("dark")}
            />
          </motion.div>
        </Fragment>
      );
    }
  };

  return <>{renderThemeChanger()}</>;
};

export default ThemeToggle;
