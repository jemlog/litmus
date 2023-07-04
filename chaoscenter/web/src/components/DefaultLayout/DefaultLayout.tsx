import React from 'react';
import { Layout, Text, Page, Heading, Container, Breadcrumb } from '@harness/uicore';
import { Icon } from '@harness/icons';
import { Color, FontVariation } from '@harness/design-system';
import cx from 'classnames';
import MainNav from '@components/MainNav';
import SideNav from '@components/SideNav';
import LitmusBreadCrumbs from '@components/LitmusBreadCrumbs';
import css from './DefaultLayout.module.scss';

export interface DefaultLayoutTemplateProps {
  breadcrumbs: Breadcrumb[];
  title: React.ReactNode;
  headerToolbar?: React.ReactNode;
  subTitle?: string;
  subHeader?: React.ReactNode;
  noPadding?: boolean;
  rightSideBar?: React.ReactNode;
  levelUpBanner?: {
    show: boolean;
    message: React.ReactNode;
  };
  loading?: boolean;
}

export default function DefaultLayoutTemplate({
  breadcrumbs,
  title,
  headerToolbar,
  subTitle,
  subHeader,
  noPadding,
  rightSideBar,
  levelUpBanner,
  loading,
  children
}: React.PropsWithChildren<DefaultLayoutTemplateProps>): React.ReactElement {
  const breadCrumb = <LitmusBreadCrumbs links={breadcrumbs} />;
  return (
    <Container>
      <Container className={css.test} flex={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        <Container flex className={css.leftSideBar}>
          <MainNav />
          <SideNav />
        </Container>
        <Container width={'100%'} border={{ right: true, style: `1px solid ${Color.GREY_200}` }}>
          <Page.Header
            size={subTitle ? 'large' : 'medium'}
            breadcrumbs={breadCrumb}
            toolbar={headerToolbar}
            title={
              <span data-testid="header">
                <Layout.Horizontal spacing="small">
                  <Heading
                    level={4}
                    className={css.title}
                    font={{ variation: FontVariation.H4 }}
                    color={Color.GREY_700}
                  >
                    {title ?? <Icon name="steps-spinner" size={22} color={Color.GREY_800} />}
                  </Heading>
                </Layout.Horizontal>
                {subTitle && (
                  <Text font={{ variation: FontVariation.SMALL }} color={Color.GREY_400} padding={{ top: 'xsmall' }}>
                    {subTitle}
                  </Text>
                )}
              </span>
            }
          />
          <Page.Body className={cx(css.pageBody, { [css.pageBodyWithLevelUpBanner]: levelUpBanner?.show === true })}>
            {subHeader && <Page.SubHeader className={css.subHeader}>{subHeader}</Page.SubHeader>}
            <Page.Body
              loading={loading}
              className={cx(css.innerContainer, {
                [css.innerContainerWithSubHeader]: subHeader,
                [css.innerContainerWithoutSubHeader]: !subHeader
              })}
            >
              <Container className={css.container} padding={noPadding ? 'none' : 'medium'}>
                {children}
              </Container>
            </Page.Body>
          </Page.Body>
        </Container>
        {rightSideBar && <Container className={css.rightSideBar}>{rightSideBar}</Container>}
      </Container>
    </Container>
  );
}