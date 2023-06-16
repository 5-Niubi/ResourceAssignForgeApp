import React from "react";

import DropboxIcon from "@atlaskit/icon/glyph/dropbox";
import FilterIcon from "@atlaskit/icon/glyph/filter";
import WorkIcon from "@atlaskit/icon/glyph/folder";
import LightbulbIcon from "@atlaskit/icon/glyph/lightbulb";
import CustomerIcon from "@atlaskit/icon/glyph/person";
import QueueIcon from "@atlaskit/icon/glyph/queues";
import SettingsIcon from "@atlaskit/icon/glyph/settings";
import LanguageIcon from "@atlaskit/icon/glyph/world";
import ActivityIcon from "@atlaskit/icon/glyph/activity";
import PeopleGroupIcon from "@atlaskit/icon/glyph/people-group";

import {
  ButtonItem,
  Header,
  LinkItem,
  NavigationFooter,
  NavigationHeader,
  NestableNavigationContent,
  NestingItem,
  Section,
  SideNavigation,
} from "@atlaskit/side-navigation";

function HomeSideBar() {
  return (
    <SideNavigation label="project" testId="side-navigation">
      <NavigationHeader>
        <Header description="Sidebar header description">Sidebar Header</Header>
      </NavigationHeader>

      <NestableNavigationContent
        initialStack={[]}
        testId="nestable-navigation-content"
      >
        <Section hasSeparator>
          <ButtonItem iconBefore={<ActivityIcon label="" />}>
            Project Lists
          </ButtonItem>
          <ButtonItem iconBefore={<PeopleGroupIcon label="" />}>
            Resources
          </ButtonItem>
          <ButtonItem iconBefore={<SettingsIcon label="" />}>
            Settings
          </ButtonItem>
        </Section>
      </NestableNavigationContent>

      <NavigationFooter>
        <div></div>
      </NavigationFooter>
    </SideNavigation>
  );
}

export default HomeSideBar;
