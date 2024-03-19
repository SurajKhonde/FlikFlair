---
description: can be Admin or User
---

# User-Model(:-)

<pre class="language-javascript"><code class="lang-javascript">const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  role: {
    type: String,
    required: true,
    default: "user",
<strong>    enum: ["admin", "user"],
</strong>  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

module.exports = mongoose.model("User", userSchema);

</code></pre>

<pre><code><strong>  enum: ["admin", "user"] 
</strong></code></pre>

<mark style="color:orange;">**Enums**</mark> (short for enumerations) are indeed quite valuable, especially in scenarios like the one you described where you have a limited set of options. Let's delve into how enums can be beneficial in the context of an Air Ticket model:

You're developing a backend system for an airline's ticketing service. In this system, you have a `Ticket` model, and one of the properties of this model is `seatType`, which can only have one of three values: `Economy`, `Business`, or `First Class`.
