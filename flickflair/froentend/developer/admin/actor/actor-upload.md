---
cover: >-
  https://images.unsplash.com/photo-1534684686641-05569203ecca?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxOTcwMjR8MHwxfHNlYXJjaHwxMHx8QWN0b3IlMjBhdWRpYXRpb258ZW58MHx8fHwxNzA1NzMwODU4fDA&ixlib=rb-4.0.3&q=85
coverY: 0
---

# Actor Upload

```javascript
import React, { useState } from "react";
import { createActor } from "../../api/actor";
import { useNotification } from "../../hooks";
import ActorForm from "../form/ActorForm";
import ModalContainer from "./ModalContainer";

export default function ActorUpload({ visible, onClose }) {
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, actor } = await createActor(data);
    setBusy(false);
    if (error) return updateNotification("error", error);

    updateNotification("success", "Actor created successfully.");
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <ActorForm
        onSubmit={!busy ? handleSubmit : null}
        title="Create New Actor"
        btnTitle="Create"
        busy={busy}
      />
    </ModalContainer>
  );
}

```

<mark style="color:purple;">**ModalContainer**</mark>



