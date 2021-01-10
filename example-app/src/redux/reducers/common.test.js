import { APP_LOAD } from '../../constants/actionTypes';
import reducer from './common';

describe('common actions', () => {
    it('APP_LOAD', ()=>{
        const result = reducer(
            {
                appName: 'Conduit',
                token: null,
                viewChangeCounter: 0
            },
            { type:APP_LOAD }
        );

        expect(result.appName).toEqual('Conduit');
        expect(result.appLoaded).toBeTruthy();
    })
})
