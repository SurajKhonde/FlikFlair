# UpdateActor

```javascript
import React, { useState } from "react";
import { updateActor } from "../../api/actor";
import { useNotification } from "../../hooks";
import ActorForm from "../form/ActorForm";
import ModalContainer from "./ModalContainer";

export default function UpdateActor({
  visible,
  initialState,
  onSuccess,
  onClose,
}) {
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, actor } = await updateActor(initialState.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    onSuccess(actor);
    updateNotification("success", "Actor updated successfully.");
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <ActorForm
        onSubmit={!busy ? handleSubmit : null}
        title="Update Actor"
        btnTitle="Update"
        busy={busy}
        initialState={initialState}
      />
    </ModalContainer>
  );
}

```



```
const handleSubmit = async (data) => {
    setBusy(true);
    const { error, actor } = await updateActor(initialState.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    onSuccess(actor);
    updateNotification("success", "Actor updated successfully.");
    onClose();
  };
```

```javascript
export default function ActorForm({
  title,
  initialState,
  btnTitle,
  busy,
  onSubmit,
}) 
```

In summary, this function is responsible for handling the submission of actor updates, managing loading states, updating notifications based on the success or failure of the operation, and triggering additional actions such as updating the UI and closing a modal. The exact behavior may depend on the implementation of the `updateActor` function, `onSuccess` callback, and how the component is structured.

{% content-ref url="../../forms/actorform.md" %}
[actorform.md](../../forms/actorform.md)
{% endcontent-ref %}



