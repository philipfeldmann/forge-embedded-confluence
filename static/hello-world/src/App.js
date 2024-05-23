import { view } from "@forge/bridge";
import { ViewPage } from "@atlaskit/embedded-confluence";
import React, { useEffect, useState } from "react";

const useForgeContext = () => {
  const [context, setContext] = useState();
  useEffect(() => {
    view.getContext().then(setContext);
  });

  return context;
};

function App() {
  const context = useForgeContext();

  const [spaceKey, setSpaceKey] = useState("");
  const [contentId, setContentId] = useState("");

  if (!context) return null;

  const getHostName = () => {
    if (!context?.siteUrl) return "";
    const url = new URL(context.siteUrl);
    return url.hostname;
  };

  const onChangeSpaceKey = (evt) => {
    setSpaceKey(evt.target.value);
  };

  const onChangeContentId = (evt) => {
    setContentId(evt.target.value);
  };

  return (
    <div>
      <p>Enter contentId and spaceKey of a page that is restricted.</p>
      <div>
        <input
          placeholder="spaceKey"
          value={spaceKey}
          onChange={onChangeSpaceKey}
        />
        <input
          placeholder="contentId"
          value={contentId}
          onChange={onChangeContentId}
        />
      </div>
      {!!contentId?.length && !!spaceKey?.length && (
        <div>
          <ViewPage
            contentId={contentId}
            locale="en-US"
            hostname={getHostName()}
            parentProduct="karma"
            spaceKey={spaceKey}
            protocol="https:"
            allowedFeatures={[
              "page-reactions",
              "page-comments",
              "disable-share",
            ]}
            isHeightSetFromContent
          />
        </div>
      )}
    </div>
  );
}

export default App;
