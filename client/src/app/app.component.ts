import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from './services/item.service';
import { Item } from './models/item.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private itemService = inject(ItemService);

  items: Item[] = [];
  loading = false;
  errorMessage = '';

  // Form model
  newTitle = '';
  newDescription = '';

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.loading = true;
    this.errorMessage = '';
    this.itemService.getItems().subscribe({
      next: (data) => {
        this.items = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar itens da API. Verifique se o backend está rodando.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  addItem(event: Event): void {
    event.preventDefault();
    if (!this.newTitle.trim()) return;

    this.itemService.createItem({
      title: this.newTitle.trim(),
      description: this.newDescription.trim(),
      completed: false
    }).subscribe({
      next: (created) => {
        this.items.push(created);
        this.newTitle = '';
        this.newDescription = '';
      },
      error: (err) => {
        this.errorMessage = 'Erro ao criar item.';
        console.error(err);
      }
    });
  }

  toggleComplete(item: Item): void {
    this.itemService.updateItem(item.id, { completed: !item.completed }).subscribe({
      next: (updated) => {
        const index = this.items.findIndex(i => i.id === updated.id);
        if (index !== -1) {
          this.items[index] = updated;
        }
      },
      error: (err) => {
        this.errorMessage = 'Erro ao atualizar item.';
        console.error(err);
      }
    });
  }

  deleteItem(id: number): void {
    this.itemService.deleteItem(id).subscribe({
      next: () => {
        this.items = this.items.filter(i => i.id !== id);
      },
      error: (err) => {
        this.errorMessage = 'Erro ao excluir item.';
        console.error(err);
      }
    });
  }
}
