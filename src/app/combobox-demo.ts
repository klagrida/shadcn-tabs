import {
  Combobox,
  ComboboxDialog,
  ComboboxInput,
  ComboboxPopupContainer,
} from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import {
  ScCombobox,
  ScComboboxPortal,
  ScComboboxTrigger,
  ScComboboxValue,
} from './ui/combobox';

@Component({
  selector: 'combobox-demo',
  imports: [
    ScCombobox,
    ScComboboxPortal,
    ScComboboxTrigger,
    ScComboboxValue,
    ComboboxDialog,
    Combobox,
    ComboboxInput,
    ComboboxPopupContainer,
    Listbox,
    Option,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex justify-center',
  },
  template: `
    <div scCombobox #combobox="scCombobox" [readonly]="true" class="w-60">
      <div scComboboxTrigger aria-label="Country selector" placeholder="Select a country...">
        <span scComboboxValue>{{ value() || 'Select a country...' }}</span>
      </div>

      <ng-template scComboboxPortal>
        <dialog ngComboboxDialog class="absolute p-0 border border-input rounded-lg bg-popover text-popover-foreground shadow-md backdrop:opacity-0">
          <div ngCombobox filterMode="manual" [alwaysExpanded]="true" class="relative w-full flex flex-col border-none rounded-lg">
            <div class="flex relative items-center border-b border-input">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="size-4 shrink-0 opacity-50 absolute left-2.5 pointer-events-none"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ngComboboxInput
                placeholder="Search..."
                [(value)]="searchString"
                class="w-full rounded-t-lg border-none bg-transparent py-2 pl-9 pr-3 text-sm outline-none"
              />
            </div>
            <ng-template ngComboboxPopupContainer>
              @if (options().length === 0) {
                <div class="p-4 text-sm text-muted-foreground">No results found</div>
              }
              <div ngListbox [(values)]="selectedCountries" class="flex flex-col gap-0.5 max-h-52 overflow-auto p-1">
                @for (option of options(); track option) {
                  <div
                    ngOption
                    [value]="option"
                    [label]="option"
                    class="group data-[active=true]:bg-accent data-[active=true]:text-accent-foreground aria-selected:bg-primary/5 aria-selected:text-primary flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5 text-sm outline-hidden select-none hover:bg-accent/50"
                  >
                    <span class="flex-1">{{ option }}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="size-4 shrink-0 opacity-0 group-aria-selected:opacity-100"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                }
              </div>
            </ng-template>
          </div>
        </dialog>
      </ng-template>
    </div>
  `,
  styles: ``,
})
export class ComboboxDemo {
  dialog = viewChild(ComboboxDialog);
  listbox = viewChild<Listbox<string>>(Listbox);
  outerCombobox = viewChild.required<ScCombobox>('combobox');
  value = signal('');
  searchString = signal('');
  options = computed(() =>
    ALL_COUNTRIES.filter((country) =>
      country.toLowerCase().startsWith(this.searchString().toLowerCase()),
    ),
  );
  selectedCountries = signal<string[]>([]);
  constructor() {
    afterRenderEffect(() => {
      if (this.dialog() && this.outerCombobox().expanded()) {
        untracked(() => this.listbox()?.gotoFirst());
        this.positionDialog();
      }
    });
    afterRenderEffect(() => {
      if (this.selectedCountries().length > 0) {
        untracked(() => this.dialog()?.close());
        this.value.set(this.selectedCountries()[0]);
        this.searchString.set('');
      }
    });
    afterRenderEffect(() => this.listbox()?.scrollActiveItemIntoView());
  }
  positionDialog() {
    const dialog = this.dialog()!;
    const combobox = this.outerCombobox().combobox;
    const comboboxRect = combobox.inputElement()?.getBoundingClientRect();
    const scrollY = window.scrollY;
    if (comboboxRect) {
      dialog.element.style.width = `${comboboxRect.width}px`;
      dialog.element.style.top = `${comboboxRect.bottom + scrollY + 4}px`;
      dialog.element.style.left = `${comboboxRect.left - 1}px`;
    }
  }
}
const ALL_COUNTRIES = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo (Congo-Brazzaville)',
  'Costa Rica',
  "Côte d'Ivoire",
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czechia (Czech Republic)',
  'Democratic Republic of the Congo',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini (fmr. ""Swaziland"")',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Holy See',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar (formerly Burma)',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine State',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States of America',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];
