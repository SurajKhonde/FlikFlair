---
description: >-
  Embarking on the web app journey begins with mastering the intricacies of
  signup and sign-in. Welcome to the developer world – where every line of code
  shapes the user's digital adventure!
cover: >-
  https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxOTcwMjR8MHwxfHNlYXJjaHwyfHxzeXN0ZW18ZW58MHx8fHwxNzA1NjU0MjA2fDA&ixlib=rb-4.0.3&q=85
coverY: 0
---

# 📨 Registration p

Hey, we developers are like wizards – we don't just talk, we cast code spells! ✨ So, here's the enchanted snippet:

My responsibility as a developer is crucial from the start. Ensuring correct and well-structured data is like having the oil that keeps the machinery running smoothly. It lays the foundation for a reliable and efficient web application.

**how do we make sure users aren't pulling our app's leg and passing the right data? Are there secret ninja methods or just a magic wand?**&#x20;

Certainly! Validating email addresses is like ensuring you invite only legit guests to your party.

```javascript
export const isValidEmail = (email) => {
  const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return isValid.test(email);
```

```
// const validateUserInfo = ({ name, email, password }) => {
  const isValidName = /^[a-z A-Z]+$/;

  if (!name.trim()) return { ok: false, error: "Name is missing!" };
  if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" };

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};
```

how hanlde changes in input&#x20;

```javascript
const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
```

<mark style="color:orange;">**why the name is special provide the squreBracket security?**</mark>\
The reason `name` is passed in square brackets `[name]` is to use the value of the `name` variable as a dynamic key when updating the state with `setUserInfo`.

<mark style="color:orange;">**Who will negotiate with the server end?**</mark>

```javascript
const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);

    const response = await createUser(userInfo);
    if (response.error) return console.log(response.error);

    navigate("/auth/verification", {
      state: { user: response.user },
      replace: true,
    });
  };
```

The `e.preventDefault()` is used to prevent the default behavior of a form submission.\


* When a form is submitted in a browser, it typically triggers a page refresh or navigation.
* This default behavior is not always desirable, especially in single-page applications (SPAs) built with frameworks like React.

```javascript
  useEffect(() => {
    // we want to move our user to somewhere else
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);
```

This is just the starting playground to grasp the game rules. If you're curious about the <mark style="color:orange;">how and why</mark><mark style="color:orange;">**,**</mark> it's all brewing in your mind. Take a journey to the page below to dive deeper; otherwise, until next time!





{% content-ref url="master-the-authentication-shark.md" %}
[master-the-authentication-shark.md](master-the-authentication-shark.md)
{% endcontent-ref %}
