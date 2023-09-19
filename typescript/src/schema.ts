import { makeSchema } from 'nexus'
import { join } from 'path'
import * as types from "./graphql";

export const schema = makeSchema({
  types,
  outputs: {
    schema: join(process.cwd(), "schema.graphql"), // 2
    typegen: join(process.cwd(), "nexus-typegen.ts") // 3
  },
  contextType: {
    module: join(process.cwd(), "./src/context.ts"), //컨텍스트 인터페이스가 내보내지는 파일 경로
    export: "Context" //해당 모ㄹ에서 내낸 인터페이스 이름
  }
})
