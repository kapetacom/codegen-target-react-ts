// @ts-ignore
import { KAPLANG_ID, KAPLANG_VERSION } from '@kapeta/kaplang-core';
import { DSLInclude, IncludeContextType } from '@kapeta/ui-web-types';

export const includes = (context: IncludeContextType = IncludeContextType.REST): DSLInclude => {
    if (context === IncludeContextType.CONFIG) {
        // These types are for entities only
        return {
            version: KAPLANG_VERSION,
            language: KAPLANG_ID,
            source: '',
        };
    }
    return {
        version: KAPLANG_VERSION,
        language: KAPLANG_ID,
        source: `
            @Native("@kapeta/sdk-rest")
            enum SortOrderDirection {
                ASC,
                DESC
            }
            
            @Native("@kapeta/sdk-rest")
            type SortOrder {
                direction: SortOrderDirection
                property: string
            }
            
            @Native("@kapeta/sdk-rest")
            type Pageable {
                page?: long
                size?: long
                sort?: SortOrder[]
            }
            `,
    };
};
