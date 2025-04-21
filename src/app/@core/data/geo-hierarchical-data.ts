import { Observable } from 'rxjs';

export abstract class GeoHierarchicalData {
  // Retorna as categorias (Superintendências, Gerências, Polos) disponíveis no nível atual
  abstract getHierarchyCategories(level: 'Superintendência' | 'Gerência' | 'Polo'): Observable<string[]>;

  // Retorna os dados associados à categoria selecionada no nível atual
  abstract getHierarchyData(level: 'Superintendência' | 'Gerência' | 'Polo', category: string): Observable<number[]>;
}