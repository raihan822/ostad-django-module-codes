# ALL Page level Components will be created here and routed in App.jsx

# Note about 'Link to':
In 2025, using NavLink instead of Link is the standard for navigation bars because it natively handles the "active" state of links.
To solve your issue—hiding the "Home" link when you are on the Home page—you can use the style or className props of NavLink. These props accept a function that provides an isActive boolean.
-------------------------------------------------------------
```html
<nav>
  {/* The 'end' prop ensures it only matches "/" exactly, not sub-routes */}
  <NavLink 
    to="/" 
    end 
    style={({ isActive }) => ({ display: isActive ? "none" : "inline" })}
  >
    Home
  </NavLink>

{/* Add a conditional separator that only shows if we are NOT at home */}
{location.pathname !== "/" && " | "}

<NavLink to="/product-list">{TAB1_NAME}</NavLink> |{" "}
<NavLink to="/create-product">{TAB2_NAME}</NavLink>
</nav>
```