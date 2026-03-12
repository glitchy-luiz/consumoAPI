import { AfterViewChecked, ChangeDetectorRef, Component, DestroyRef, effect, inject, input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { Pokemon } from '../../Services/pokemon';
import { catchError, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card{
  
  nome = input.required<string>();

  type1 = signal<string>('');
  type2 = signal<string>('');
  sprite = signal<string>('');
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  private svc = inject(Pokemon);
  private destroyRef = inject(DestroyRef);
  private sub?: Subscription;

  constructor() {
    effect(() => {
      const n = this.nome();

      this.error.set(null);
      this.type1.set('');
      this.type2.set('');
      this.sprite.set('');

      this.sub?.unsubscribe();

      if (!n) {
        this.loading.set(false);
        return;
      }

      this.loading.set(true);

      this.sub = this.svc
        .getPokemonByName(n)
        .pipe(
          catchError((err) => {
            console.error('Erro ao carregar pokemon:', err);
            this.error.set('Erro ao carregar dados.');
            return of(null);
          })
        )
        .subscribe((pkm: any) => {
          if (pkm) {
            this.type1.set(pkm?.types?.[0]?.type?.name ?? 'desconhecido');
            this.type2.set(pkm?.types?.[1]?.type?.name ?? '');
            this.sprite.set(pkm?.sprites?.front_default ?? '');
          }
          this.loading.set(false);
        });
      }
    );

    this.destroyRef.onDestroy(() => this.sub?.unsubscribe());
  }

}
