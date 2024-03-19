# AddRatingModal



```javascript
 <AddRatingModal
        visible={showRatingModal}
        onClose={hideRatingModal}
        onSuccess={handleOnRatingSuccess}
      />
```

```javascript
import React from "react";
import { useParams } from "react-router-dom";
import { addReview } from "../../api/review";
import { useNotification } from "../../hooks";
import RatingForm from "../form/RatingForm";
import ModalContainer from "./ModalContainer";

export default function AddRatingModal({ visible, onSuccess, onClose }) {
  const { movieId } = useParams();
  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    const { error, message, reviews } = await addReview(movieId, data);
    if (error) return updateNotification("error", error);

    updateNotification("success", message);
    onSuccess(reviews);
    onClose();
  };
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <RatingForm onSubmit={handleSubmit} />
    </ModalContainer>
  );
}

```



```
 const handleSubmit = async (data) => {
    const { error, message, reviews } = await addReview(movieId, data);
    if (error) return updateNotification("error", error);

    updateNotification("success", message);
    onSuccess(reviews);
    onClose();
  };
```

In summary, this function is responsible for handling the submission of a review, updating notifications based on the success or failure of the operation, and triggering additional actions such as updating the UI and closing a modal. The exact behavior may depend on the implementation of the `addReview` function, `onSuccess` callback, and how the component is structured.

{% content-ref url="modalcontainer.md" %}
[modalcontainer.md](modalcontainer.md)
{% endcontent-ref %}

{% content-ref url="ratingform-1.md" %}
[ratingform-1.md](ratingform-1.md)
{% endcontent-ref %}







