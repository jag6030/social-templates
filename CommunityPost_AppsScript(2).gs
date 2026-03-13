// ============================================================
//  JENN GABEL — COMMUNITY POST APPS SCRIPT
//  Paste this entire file into your Google Sheet's
//  Apps Script editor (Extensions > Apps Script)
// ============================================================

// ── CONFIGURATION ───────────────────────────────────────────
const TEMPLATE_URL = 'https://jag6030.github.io/social_posts/community_post_template.html';

// Town → footer color map (alphabetical)
// ink, paper, and cta_color are fixed — only footer changes per town
const TOWN_COLORS = {
  'CHERRY HILL':     { ink: '#1a1a1a', paper: '#fffefa', footer: '#c41230', cta_color: '#faf8f3' },
  'COLLINGSWOOD':    { ink: '#1a1a1a', paper: '#fffefa', footer: '#8f0000', cta_color: '#faf8f3' },
  'HADDON HEIGHTS':  { ink: '#1a1a1a', paper: '#fffefa', footer: '#0f7807', cta_color: '#faf8f3' },
  'HADDON TOWNSHIP': { ink: '#1a1a1a', paper: '#fffefa', footer: '#076407', cta_color: '#faf8f3' },
  'HADDONFIELD':     { ink: '#1a1a1a', paper: '#fffefa', footer: '#122b78', cta_color: '#faf8f3' },
  'MARLTON':         { ink: '#1a1a1a', paper: '#fffefa', footer: '#122b78', cta_color: '#faf8f3' },
  'MEDFORD':         { ink: '#1a1a1a', paper: '#fffefa', footer: '#076407', cta_color: '#faf8f3' },
  'MERCHANTVILLE':   { ink: '#1a1a1a', paper: '#fffefa', footer: '#566cae', cta_color: '#faf8f3' },
  'MOORESTOWN':      { ink: '#1a1a1a', paper: '#fffefa', footer: '#0f7807', cta_color: '#faf8f3' },
  'MOUNT LAUREL':    { ink: '#1a1a1a', paper: '#fffefa', footer: '#8f0000', cta_color: '#faf8f3' },
  'VOORHEES':        { ink: '#1a1a1a', paper: '#fffefa', footer: '#566cae', cta_color: '#faf8f3' },
};

// ── COLUMN MAP — Community News sheet ───────────────────────
const COL = {
  TOWN:        1,   // A
  DATE:        2,   // B
  STATUS:      3,   // C
  LOCATION:    4,   // D
  HL1:         5,   // E  Headline Line 1
  HL2:         6,   // F  Headline Line 2
  TOWNSUB:     7,   // G  Tag Subtitle
  BODY1:       8,   // H  Body Left
  BODY2:       9,   // I  Body Right
  P2HL:       10,   // J  Page 2 Headline
  QUOTE:      11,   // K  Quote text
  QUOTEATTR:  12,   // L  Quote attribution
  BTMTITLE:   13,   // M  Bottom section title
  BTMBODY:    14,   // N  Bottom section body
  CTA1:       15,   // O  CTA Line 1
  CTA2:       16,   // P  CTA Line 2
  IG_CAPTION: 17,   // Q
  GBP_CAPTION:18,   // R
  NOTES:      19,   // S
  // Column T = Open Template button
};

// ── MENU SETUP ───────────────────────────────────────────────
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('📰 Community Post')
    .addItem('▶ Open Template for Selected Row', 'openTemplateForRow')
    .addItem('✅ Mark Row as Approved', 'markApproved')
    .addItem('📋 Copy IG Caption', 'copyIGCaption')
    .addSeparator()
    .addItem('⚙ Setup: Add Headers to Sheet', 'setupHeaders')
    .addToUi();
}

// ── OPEN TEMPLATE FOR SELECTED ROW ───────────────────────────
function openTemplateForRow() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const row   = sheet.getActiveRange().getRow();

  if (row <= 1) {
    SpreadsheetApp.getUi().alert('Please click on a data row (not the header row) first.');
    return;
  }

  const data   = sheet.getRange(row, 1, 1, 19).getValues()[0];
  const town   = String(data[COL.TOWN - 1]).trim().toUpperCase();
  const colors = TOWN_COLORS[town] || TOWN_COLORS['VOORHEES'];

  const location = data[COL.LOCATION - 1] || 'Camden & Burlington Counties';
  const cta2     = data[COL.CTA2 - 1]     || 'call Jenn';

  const params = new URLSearchParams({
    town:      data[COL.TOWN - 1],
    date:      data[COL.DATE - 1] ? formatDate(data[COL.DATE - 1]) : '',
    location:  location,
    hl1:       data[COL.HL1 - 1],
    hl2:       data[COL.HL2 - 1],
    townsub:   data[COL.TOWNSUB - 1],
    body1:     data[COL.BODY1 - 1],
    body2:     data[COL.BODY2 - 1],
    p2hl:      data[COL.P2HL - 1],
    quote:     data[COL.QUOTE - 1],
    quoteattr: data[COL.QUOTEATTR - 1],
    btmtitle:  data[COL.BTMTITLE - 1],
    btmbody:   data[COL.BTMBODY - 1],
    cta1:      data[COL.CTA1 - 1],
    cta2:      cta2,
    ink:       colors.ink,
    paper:     colors.paper,
    footer:    colors.footer,
    cta_color: colors.cta_color,
  });

  const fullURL = `${TEMPLATE_URL}?${params.toString()}`;

  const html = HtmlService.createHtmlOutput(
    `<script>window.open('${fullURL}', '_blank'); google.script.host.close();<\/script>`
  ).setWidth(1).setHeight(1);
  SpreadsheetApp.getUi().showModalDialog(html, 'Opening template...');
}

// ── MARK ROW APPROVED ────────────────────────────────────────
function markApproved() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const row   = sheet.getActiveRange().getRow();
  if (row <= 1) return;
  sheet.getRange(row, COL.STATUS).setValue('APPROVED');
  sheet.getRange(row, COL.STATUS).setBackground('#d4edda').setFontColor('#155724');
  SpreadsheetApp.getUi().alert('Row ' + row + ' marked as APPROVED.');
}

// ── COPY IG CAPTION ───────────────────────────────────────────
function copyIGCaption() {
  const sheet   = SpreadsheetApp.getActiveSheet();
  const row     = sheet.getActiveRange().getRow();
  if (row <= 1) return;
  const caption = sheet.getRange(row, COL.IG_CAPTION).getValue();
  if (!caption) {
    SpreadsheetApp.getUi().alert('No IG caption found in column Q for this row.\nGenerate one in the template first, then paste it back here.');
    return;
  }
  const html = HtmlService.createHtmlOutput(
    `<textarea id="t" style="width:100%;height:200px;font-size:12px;">${caption}</textarea>
     <p style="font-size:11px;color:#666;">Select all (Ctrl+A / Cmd+A) then copy.</p>`
  ).setWidth(500).setHeight(280);
  SpreadsheetApp.getUi().showModalDialog(html, 'IG Caption — Row ' + row);
}

// ── SETUP HEADERS ────────────────────────────────────────────
function setupHeaders() {
  const sheet   = SpreadsheetApp.getActiveSheet();
  const headers = [
    'Town',             // A
    'Publish Date',     // B
    'Status',           // C
    'Location Line',    // D
    'Headline Line 1',  // E
    'Headline Line 2',  // F
    'Tag Subtitle',     // G
    'Body Left',        // H
    'Body Right',       // I
    'Page 2 Headline',  // J
    'Quote',            // K
    'Quote Attribution',// L
    'Section Title',    // M
    'Section Body',     // N
    'CTA Line 1',       // O
    'CTA Line 2',       // P
    'IG Caption',       // Q
    'GBP Caption',      // R
    'Notes',            // S
    'Open Template',    // T
  ];

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setBackground('#1a1a1a').setFontColor('#ffffff')
    .setFontWeight('bold').setFontSize(10)
    .setHorizontalAlignment('center');

  sheet.setFrozenRows(1);

  const widths = [120,100,90,160,160,160,120,220,220,160,200,140,140,220,140,100,300,250,160,120];
  widths.forEach((w, i) => sheet.setColumnWidth(i + 1, w));

  // Status dropdown
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['DRAFT','APPROVED','SCHEDULED','PUBLISHED'], true)
    .build();
  sheet.getRange(2, COL.STATUS, 200).setDataValidation(statusRule);

  // Town dropdown — alphabetical from TOWN_COLORS keys
  const townRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(Object.keys(TOWN_COLORS), true)
    .build();
  sheet.getRange(2, COL.TOWN, 200).setDataValidation(townRule);

  // Wrap text in body/caption columns
  sheet.getRange(2, COL.BODY1, 200).setWrap(true);
  sheet.getRange(2, COL.BODY2, 200).setWrap(true);
  sheet.getRange(2, COL.IG_CAPTION, 200).setWrap(true);
  sheet.getRange(2, COL.GBP_CAPTION, 200).setWrap(true);

  // Default CTA Line 2
  sheet.getRange(2, COL.CTA2, 200).setValue('call Jenn');

  SpreadsheetApp.getUi().alert('✅ Headers and formatting applied!\n\nNext steps:\n1. Rename this sheet tab to "Community News"\n2. Use the menu to open the template for any filled row.');
}

// ── HELPER: Format date ───────────────────────────────────────
function formatDate(d) {
  if (!d) return '';
  if (typeof d === 'string') return d;
  const months = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
