// /src/components/ReleaseStatus.tsx

// React modules
import React from "react";
// Docusaurus admonition, so output matches the markdown :::info style
import Admonition from "@theme/Admonition";

// Lifecycle stages for a release; "ga" (or omitting the stage) renders nothing
type ReleaseStage = "development" | "beta" | "submitted" | "deploying" | "ga";

interface IReleaseStatusProps {
  version: string;
  stage?: ReleaseStage;
}

// Component to render the release lifecycle status admonition at the top of
// the change log. Update the stage prop in changelog.md as the release moves
// through its lifecycle, rather than commenting/uncommenting blocks.
const ReleaseStatus = ({ version, stage = "ga" }: IReleaseStatusProps) => {
  switch (stage) {
    case "development":
      return (
        <Admonition type="info" title="Under development 🚧">
          <p>
            Documentation is being written ahead of starting alpha testing, so
            the features described below are subject to change as testing and
            feedback is received. We will update this page and other pertinent
            areas in this version's documentation with any changes to the
            planned features, and will also add more details on each feature as
            they are finalized.
          </p>
          <p>
            Changes are currently only available in{" "}
            <a href="/community/early-access">alpha builds</a>, but we'll
            release and submit soon once testing is complete.
          </p>
        </Admonition>
      );
    case "beta":
      return (
        <Admonition type="info" title="In Beta Testing">
          <p>
            Deneb {version} is currently in a beta testing phase. If you would
            like to help test this release prior to general availability, please
            visit the{" "}
            <a href="/community/early-access">early access community page</a> to
            download the beta build and provide feedback.
          </p>
        </Admonition>
      );
    case "submitted":
      return (
        <Admonition type="info" title="Submitted for certification">
          <p>
            Deneb {version} has been submitted to AppSource for certification.
            Approval is dependent on the <a href="https://learn.microsoft.com/en-us/power-bi/developer/visuals/power-bi-custom-visuals-certified">
            certification rules</a>, and may require additional changes (and
            resubmission) before the update is accepted.
          </p>
        </Admonition>
      );
    case "deploying":
      return (
        <Admonition type="info" title="Pending deployment to AppSource">
          <p>
            Deneb {version} has passed certification and is currently undergoing
            deployment to your reports. This can take a couple of weeks from the
            publish date.
          </p>
        </Admonition>
      );
    default:
      return null;
  }
};

export default ReleaseStatus;
