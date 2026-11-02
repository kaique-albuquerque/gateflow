import { ALL_COLLECTIONS } from '@/constants/collections';
import { sleep } from '@/services/mock/latency';
import { removeStored } from '@/services/storage/storage';

/**
 * Remove os dados persistidos. Como os repositórios recriam a massa
 * demonstrativa quando a chave não existe, a aplicação volta ao estado inicial.
 */
export async function resetDemoData(): Promise<void> {
  await sleep(240);
  ALL_COLLECTIONS.forEach((collection) => removeStored(collection));
}
