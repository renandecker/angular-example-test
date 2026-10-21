import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item, ItemCreateInput, ItemUpdateInput } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private http = inject(HttpClient);
  private apiUrl = '/api/items';

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  createItem(input: ItemCreateInput): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, input);
  }

  updateItem(id: number, input: ItemUpdateInput): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${id}`, input);
  }

  deleteItem(id: number): Observable<Item> {
    return this.http.delete<Item>(`${this.apiUrl}/${id}`);
  }
}
