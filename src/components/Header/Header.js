import React, { useState, useEffect, createRef } from 'react';
import { Link, navigate } from 'gatsby';
import { isAuth } from '../../helpers/general';

import AddNotification from '../AddNotification';
import Brand from '../Brand';
import Container from '../Container';
import Config from '../../config.json';
import Drawer from '../Drawer';
import ExpandedMenu from '../ExpandedMenu';
import FormInputField from '../FormInputField/FormInputField';
import Icon from '../Icons/Icon';
import { useLocation } from '@reach/router';
import MiniCart from '../MiniCart';
import MobileNavigation from '../MobileNavigation';

import * as styles from './Header.module.css';

const Header = () => {
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [menu, setMenu] = useState();
  const [activeMenu, setActiveMenu] = useState();
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const location = useLocation();
  const searchRef = createRef();
  const bannerMessage = 'Support your local business';
  const searchSuggestions = ['White Sculpture', 'Black Sculpture', 'Red Sculpture'];

  // 👇 Cart count sync
  useEffect(() => {
    const syncCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = storedCart.reduce((sum, item) => sum + (item.quantity || 0), 0);
      setCartCount(totalItems);
    };

    syncCartCount();
    window.addEventListener('storage', syncCartCount);
    const interval = setInterval(syncCartCount, 500); // Backup polling

    return () => {
      window.removeEventListener('storage', syncCartCount);
      clearInterval(interval);
    };
  }, []);

  const handleHover = (navObject) => {
    if (navObject.category) {
      setShowMenu(true);
      setMenu(navObject.category);
      setShowSearch(false);
    } else {
      setMenu(undefined);
    }
    setActiveMenu(navObject.menuLabel);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${search}`);
    setShowSearch(false);
  };

  useEffect(() => {
    if (showMenu === false) setActiveMenu(false);
  }, [showMenu]);

  useEffect(() => {
    const onScroll = () => {
      setShowMenu(false);
      setShowSearch(false);
      setActiveMenu(undefined);
    };
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (showSearch === true) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 250);
    }
  }, [showSearch]);

  return (
    <div className={styles.root}>
      <div className={styles.headerMessageContainer}>
        <span>{bannerMessage}</span>
      </div>

      <Container size="large" spacing="min">
        <div className={styles.header}>
          <div className={styles.linkContainer}>
            <nav
              role="presentation"
              onMouseLeave={() => {
                setShowMenu(false);
              }}
            >
              {Config.headerLinks.map((navObject) => (
                <Link
                  key={navObject.menuLink}
                  onMouseEnter={() => handleHover(navObject)}
                  className={`${styles.navLink} ${
                    location.pathname === navObject.menuLink ? styles.activeLink : ''
                  }`}
                  to={navObject.menuLink}
                >
                  {navObject.menuLabel}
                </Link>
              ))}
            </nav>
          </div>

          <div
            role="presentation"
            onClick={() => setMobileMenu(!mobileMenu)}
            className={styles.burgerIcon}
          >
            <Icon symbol={mobileMenu === true ? 'cross' : 'burger'} />
          </div>

          <Brand />

          <div className={styles.actionContainers}>
            <button
              aria-label="Search"
              className={`${styles.iconButton} ${styles.iconContainer}`}
              onClick={() => setShowSearch(!showSearch)}
            >
              <Icon symbol="search" />
            </button>

            <Link
              aria-label="Favorites"
              to="/account/favorites"
              className={`${styles.iconContainer} ${styles.hideOnMobile}`}
            >
              <Icon symbol="heart" />
            </Link>

            <Link
              aria-label="Orders"
              to={isAuth() ? '/account/orders/' : '/login'}
              className={`${styles.iconContainer} ${styles.hideOnMobile}`}
            >
              <Icon symbol="user" />
            </Link>

            <button
              aria-label="Cart"
              className={`${styles.iconButton} ${styles.iconContainer} ${styles.bagIconContainer}`}
              onClick={() => {
                setShowMiniCart(true);
                setMobileMenu(false);
              }}
            >
              <Icon symbol="bag" />
              {cartCount > 0 && (
                <div className={styles.bagNotification}>
                  <span>{cartCount}</span>
                </div>
              )}
            </button>

            <div className={styles.notificationContainer}>
              <AddNotification openCart={() => setShowMiniCart(true)} />
            </div>
          </div>
        </div>

        <div className={styles.taglineWrapper}>
          <span className={styles.tagline}>
            Sculpture as story. Queerness as form. Made in Naarm.
          </span>
        </div>

        <div
          className={`${styles.searchContainer} ${
            showSearch === true ? styles.show : styles.hide
          }`}
        >
          <h4>What are you looking for?</h4>
          <form className={styles.searchForm} onSubmit={(e) => handleSearch(e)}>
            <FormInputField
              ref={searchRef}
              icon="arrow"
              id="searchInput"
              value={search}
              placeholder=""
              type="text"
              handleChange={(_, e) => setSearch(e)}
            />
          </form>

          <div className={styles.suggestionContianer}>
            {searchSuggestions.map((suggestion, index) => (
              <p
                role="presentation"
                onClick={() => {
                  setShowSearch(false);
                  navigate(`/search?q=${suggestion}`);
                }}
                key={index}
                className={styles.suggestion}
              >
                {suggestion}
              </p>
            ))}
          </div>

          <div
            role="presentation"
            onClick={(e) => {
              e.stopPropagation();
              setShowSearch(false);
            }}
            className={styles.backdrop}
          />
        </div>
      </Container>

      <div
        role="presentation"
        onMouseLeave={() => setShowMenu(false)}
        onMouseEnter={() => setShowMenu(true)}
        className={`${styles.menuContainer} ${showMenu === true ? styles.show : ''}`}
      >
        <Container size="large" spacing="min">
          <ExpandedMenu menu={menu} />
        </Container>
      </div>

      <Drawer visible={showMiniCart} close={() => setShowMiniCart(false)}>
        <MiniCart />
      </Drawer>

      <div className={styles.mobileMenuContainer}>
        <Drawer
          hideCross
          top="98px"
          isReverse
          visible={mobileMenu}
          close={() => setMobileMenu(false)}
        >
          <MobileNavigation close={() => setMobileMenu(false)} />
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
