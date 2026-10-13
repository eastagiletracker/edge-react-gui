import { describe, expect, it } from '@jest/globals'
import { render } from '@testing-library/react-native'
import * as React from 'react'

import { SwapCreateScene } from '../../components/scenes/SwapCreateScene'
import { lstrings } from '../../locales/strings'
import { FakeProviders, type FakeState } from '../../util/fake/FakeProviders'
import { fakeRootState } from '../../util/fake/fakeRootState'
import { fakeSwapTabSceneProps } from '../../util/fake/fakeSceneProps'

describe('SwapCreateScene', () => {
  it('should render with loading props', () => {
    const rootState: FakeState = { ...fakeRootState }

    const rendered = render(
      <FakeProviders initialState={rootState}>
        <SwapCreateScene {...fakeSwapTabSceneProps('swapCreate', {})} />
      </FakeProviders>
    )

    expect(rendered.toJSON()).toMatchSnapshot()
    rendered.unmount()
  })

  it('offers the Stealth Swap toggle before any wallet is picked', () => {
    const rootState: FakeState = { ...fakeRootState }

    const rendered = render(
      <FakeProviders initialState={rootState}>
        <SwapCreateScene {...fakeSwapTabSceneProps('swapCreate', {})} />
      </FakeProviders>
    )

    expect(rendered.getByText(lstrings.stealth_swap_toggle)).toBeTruthy()
    expect(
      rendered.queryByText(lstrings.stealth_swap_info, { exact: false })
    ).toBeNull()
    rendered.unmount()
  })
})
