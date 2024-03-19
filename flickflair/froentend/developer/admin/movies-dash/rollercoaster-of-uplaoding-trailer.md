---
description: >-
  Now, buckle up for the rollercoaster of hurdles developers might face when
  hurling a video file into the digital abyss.
---

# 🤞 RollerCoaster of uplaoding trailer

Now, let's play detective and make sure the admin isn't slipping in a surprise file format. I don't have a crystal ball for admin intentions, so I'll slap some restrictions in the code and keep things on the straight and narrow\


```javascript
 <FileUploader
        handleChange={handleChange}
        onTypeError={onTypeError}
        types={["mp4", "avi"]} ## only that type allowed
      >
```

let me clear the <mark style="color:purple;">**flow**</mark> of data \
c[lientSide ==> serverSide ==> onClo](#user-content-fn-1)[^1]ud

Alright, Sherlock, how do I sneak a peek and confirm that the mystical process of video uploading is unfolding backstage?\


```javascript
const UploadProgress = ({ width, message, visible }) => {
  if (!visible) return null;

  return (
    <div className="dark:bg-secondary bg-white drop-shadow-lg rounded p-3">
      <div className="relative h-3 dark:bg-dark-subtle bg-light-subtle overflow-hidden">
        <div
          style={{ width: width + "%" }}
          className="h-full absolute left-0 dark:bg-white bg-secondary"
        />
      </div>
      <p className="font-semibold dark:text-dark-subtle text-light-subtle animate-pulse mt-1">
        {message}
      </p>
    </div>
  );
};
```

The above code will create a progress bar at the top of the movie form, and I've set up a notification for successful uploads. However, there's a little twist – when the admin sends the video, it goes to the server first, and then the server sends it to the cloud, right? The server confirms that it received the video, but we're still waiting for the cloud to give us the thumbs up. So, after reaching 100% completion, I need to display a small processing text until we get the green light from the cloud.

&#x20;\


```javascript
const getUploadProgressValue = () => {
    if (!videoUploaded && uploadProgress >= 100) {
      return "Processing";
    }

    return `Upload progress ${uploadProgress}%`;
  };
```

Now that I've gone through each step of the scenario and everything checks out, it's time to snag that response from the server. Assuming all is well, pass the baton my way, and let's kick off the next process of filling out the form and hitting that submit button!\


```javascript
const handleChange = (file) => {
    const formData = new FormData();
    formData.append("video", file); this is expected for backend 

    setVideoSelected(true);
    handleUploadTrailer(formData);
  };   
    const handleUploadTrailer = async (data) => {
    const { error, url, public_id } = await uploadTrailer(
      data,
      setUploadProgress
    );
    if (error) return updateNotification("error", error);

    setVideoUploaded(true);
    setVideoInfo({ url, public_id });this one i got from server
  };
```

[^1]: 
