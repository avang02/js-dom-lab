
// Task 1.0 - Select and cache the <main> element in a variable named mainEl.
const mainEl = document.querySelector('main');
// Task 1.1 - 
mainEl.style.backgroundColor = 'var(--main-bg)';
// Task 1.2 - Set the content of mainEl to <h1>SEI Rocks!</h1>.
mainEl.innerHTML = '<h1>SEI Rocks!</h1>';
// Task 1.3 - Add a class of flex-ctr to mainEl.
mainEl.classList.add("flex-ctr")


// Task 2.0 - Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
const topMenuEl = document.getElementById('top-menu');
// Task 2.1 - Set the height topMenuEl element to be 100%.
topMenuEl.style.height = "100%";
// Task 2.3 - Add a class of flex-around to topMenuEl.
topMenuEl.classList.add('flex-around');


// Menu data structure
const menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];
// Task 3.1 - Iterate over the entire menuLinks array and for each "link" object:
// Create an <a> element.
// Hint: Research the document.createElement method.
// On the new element, add an href attribute with its value set to the href property of the "link" object.
// Set the new element's content to the value of the text property of the "link" object
// Append the new element to the topMenuEl element.
function createMenuLink(links) {
  const menuLinkHolder = [];
  for (let i = 0; i < links.length; i++) {
    const newA = document.createElement('a');
    newA.innerText = links[i].text;
    newA.href = links[i].href;
    topMenuEl.appendChild(newA);
  }   
}
createMenuLink(menuLinks);

// Task 4.0 - Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
const subMenuEl = document.getElementById('sub-menu');
// Task 4.3 - Add the class of flex-around to the subMenuEl element.
subMenuEl.classList.add('flex-around');
// Task 4.4 - Set the CSS position property of subMenuEl to the value of absolute.
subMenuEl.style.position = 'absolute';
// Task 4.5 - Set the CSS top property of subMenuEl to the value of 0.
subMenuEl.style.top = 0;

// Task 5.1 - Select and cache all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.
// Declare a global showingSubMenu variable and initialize it to false;
const topMenuLinks = document.querySelectorAll('a');
let showingSubMenu = false;
// Task 5.2 - Attach a delegated 'click' event listener to topMenuEl.
// The first line of code of the event listener function should call the event object’s preventDefault() method.
// The second line of code function should immediately return if the element clicked was not an <a> element.
topMenuEl.addEventListener('click', function(evt) {
  evt.preventDefault();
  const link = evt.target;
  if(link.tagName !== 'A') {
    return;
  }
  console.log(link.textContent);
  // Task 5.3 - This feature “deselects” the menu item if it’s clicked when it’s currently active, resulting in the sub-menu sliding up as well.
  // Next in the event listener, if the clicked <a> link has a class of active:
  // Remove the active class from the clicked <a> element.
  // Set the showingSubMenu to false.
  // Set the CSS top property of subMenuEl to 0.
  // return; from the event listener function.
  if(link.classList.contains('active')) {
    link.classList.remove('active');
    showingSubMenu = false;
    subMenuEl.style.top = 0;
    return;
  }
  // Task 5.4 - dd code to the bottom of the the event listener that iterates over each <a> element in topMenuLinks and removes the class name of active, 
  // regardless of whether the <a> element has a class of active or not.
  topMenuLinks.forEach(function(link) {
    link.classList.remove('active');
  })
  // Task 5.5 - Next, the event listener should add a class name of active to the <a> element that was clicked.
  link.classList.add('active');
  // Task 5.6 - Next, add code in the event listener that sets showingSubMenu to true if the clicked <a> element’s “link” object within menuLinks has a subLinks property 
  // (all do, except for the “link” object for ABOUT), otherwise, set it to false.
  const getLinkData = menuLinks.find(function(obj){
    return (obj.text === link.textContent);
  });
  showingSubMenu = 'subLinks' in getLinkData;
  // 5.7 - If showingSubMenu is true:
  // Call a buildSubMenu function, passing to it the subLinks array for the clicked <a> element.
  // Set the CSS top property of subMenuEl to 100%.
  // Otherwise (showingSubMenu is false):
  // Set the CSS top property of subMenuEl to 0.
  // Since the About link has been clicked, set mainEl.innerHTML to '<h1>about</h1>'.
  if(showingSubMenu) {
    buildSubMenu(getLinkData.subLinks)
    subMenuEl.style.top = '100%'
  } else {
    subMenuEl.style.top = 0;
    mainEl.innerHTML = '<h1>about</h1>';
  }
})

// Task 5.8 - Code the buildSubMenu function so that it:
// Clears the contents of subMenuEl.
// Iterates over the subLinks array passed as an argument; and for each “link” object:
// Create an <a> element.
// On the new element, add an href attribute with its value set to the href property of the “link” object.
// Set the new element’s content to the value of the text property of the “link” object.
// Append the new element to the subMenuEl element.
  function buildSubMenu(subData) {
    subMenuEl.innerHTML = '';
    subData.forEach(function(link) { 
      const newA = document.createElement('a');
      newA.setAttribute('href', link.href);
      newA.text = link.text;
      subMenuEl.append(newA);
    });
  }
  // Task 6.0 
  // Attach a delegated ‘click’ event listener to subMenuEl
  // The first line of code of the event listener function should call the event object’s preventDefault() method.
  // The second line of code function should immediately return if the element clicked was not an <a> element.
  // console.log the content of the <a> to verify the handler is working.
  subMenuEl.addEventListener('click', function(evt) {
    evt.preventDefault();
    const link = evt.target;
    if(link.tagName !== 'A'){
      return;
    } else {
    console.log(link.textContent);
    }
    // Task 6.1 Next, subMenuEl’s event listener should:
    // Set showingSubMenu to false.
    // Set the CSS top property of subMenuEl to 0.
    showingSubMenu = false;
    subMenuEl.style.top = 0;
    // Task 6.2 - Next, subMenuEl’s event listener should remove the class name of active from each 
    // <a> element in topMenuLinks - whether the active class exists or not.
    subMenuEl.classList.remove('active');
    // Task 6.3 - Next, subMenuEl’s event listener should update the contents of mainEl to the contents of the <a> element, within an <h1>, clicked within subMenuEl.
    mainEl.innerHTML = `<h1>${link.textContent.toUpperCase()}</h1>`;
  });