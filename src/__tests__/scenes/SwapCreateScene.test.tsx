import { describe, expect, it, jest } from '@jest/globals'
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

  it('turns Stealth Swap on from the stealth param', () => {
    const rootState: FakeState = { ...fakeRootState }
    const sceneProps = fakeSwapTabSceneProps('swapCreate', { stealth: true })
    const setParams = jest.spyOn(sceneProps.navigation, 'setParams')

    const rendered = render(
      <FakeProviders initialState={rootState}>
        <SwapCreateScene {...sceneProps} />
      </FakeProviders>
    )

    expect(
      rendered.getByText(lstrings.stealth_swap_info, { exact: false })
    ).toBeTruthy()
    // The param is consumed, so later param merges cannot re-apply it:
    expect(setParams).toHaveBeenCalledWith({ stealth: undefined })
    rendered.unmount()
  })
})
