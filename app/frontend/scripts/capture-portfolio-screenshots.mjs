import { chromium, devices } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const outputRoot = path.resolve("public/images/portfolio");

const projects = [
  {
    slug: "atlanse-solutions",
    url: "https://atlansesolutions.com/",
    waitForText: /Power your business|Atlanse Solutions/i,
    candidates: [
      ["solutions-overview.png", /solutions/i],
      ["consulting-cta.png", /contact|consult/i],
    ],
  },
  {
    slug: "yaseer",
    url: "https://yaseerinstitute.com/",
    candidates: [
      ["course-catalog.png", /__capture_homepage_section__/i],
      ["registration-journey.png", /register|registration|enroll|admission|contact/i],
    ],
  },
  {
    slug: "learn-french-fast",
    url: "https://www.learnfrenchfast.ca/",
    candidates: [
      ["packages-section.png", /pricing|package|plan|program/i],
      ["faq-enrollment.png", /faq|question|enroll|contact|book/i],
    ],
  },
  {
    slug: "triplexon",
    url: "https://triplexon.com/",
    candidates: [
      ["service-positioning.png", /service|solution|work/i],
      ["inquiry-cta.png", /contact|quote|consult|book/i],
    ],
  },
  {
    slug: "razan-fashion",
    url: "https://razanfashion.com/",
    waitForText: /Hijabs for Religious Occasions|Shop Razan|Razan Fashion was founded/i,
    candidates: [
      ["collection-browsing.png", /shop|collection|category|store/i],
      ["product-discovery.png", /product|dress|fashion|cart/i],
    ],
  },
];

function sameSiteLink(baseUrl, href) {
  try {
    const base = new URL(baseUrl);
    const next = new URL(href, base);
    if (next.hostname.replace(/^www\./, "") !== base.hostname.replace(/^www\./, "")) return null;
    next.hash = "";
    return next.href;
  } catch {
    return null;
  }
}

async function collectLinks(page, baseUrl) {
  const links = await page.$$eval("a[href]", (anchors) =>
    anchors.map((anchor) => ({
      href: anchor.getAttribute("href") || "",
      text: anchor.textContent || "",
      aria: anchor.getAttribute("aria-label") || "",
    })),
  );

  const seen = new Set();
  return links
    .map((link) => {
      const href = sameSiteLink(baseUrl, link.href);
      if (!href || seen.has(href)) return null;
      seen.add(href);
      return { href, label: `${link.text} ${link.aria} ${href}` };
    })
    .filter(Boolean);
}

async function waitForReady(page) {
  await page.waitForLoadState("domcontentloaded", { timeout: 30000 }).catch(() => {});
  await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => {});
  await page.evaluate(async () => {
    const imageWait = Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .slice(0, 20)
        .map((img) => new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        })),
    );
    const timeout = new Promise((resolve) => setTimeout(resolve, 4000));
    await Promise.race([imageWait, timeout]);
  }).catch(() => {});
}

async function waitForProjectContent(page, project) {
  if (!project.waitForText) return;

  await page.waitForFunction(
    (source) => {
      const matcher = new RegExp(source, "i");
      return matcher.test(document.body?.innerText || "");
    },
    project.waitForText.source,
    { timeout: 15000 },
  ).catch(() => {});
  await page.keyboard.press("Escape").catch(() => {});
  await page.evaluate(() => {
    const selectors = [
      ".bannerContent__closeButton",
      ".mc-closeModal",
      ".mailmunch-close",
      ".klaviyo-close-form",
      "[aria-label='Close']",
      "[aria-label='close']",
      "[class*='close']",
      "[id*='close']",
    ];
    for (const selector of selectors) {
      for (const element of document.querySelectorAll(selector)) {
        const rect = element.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          element.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
        }
      }
    }
  }).catch(() => {});
  await page.locator("button, a, [role='button']").filter({ hasText: "×" }).first().click({ timeout: 1500 }).catch(() => {});
  if (project.slug === "razan-fashion") {
    await page.evaluate(() => {
      const removeElement = (element) => {
        let target = element;
        while (target.parentElement && target.parentElement !== document.body) {
          const rect = target.getBoundingClientRect();
          if (rect.width > window.innerWidth * 0.25 && rect.height > window.innerHeight * 0.15) break;
          target = target.parentElement;
        }
        target.remove();
      };

      for (const element of Array.from(document.querySelectorAll("body *"))) {
        const text = element.textContent || "";
        const className = String(element.className || "");
        if (
          text.includes("Get exclusive updates and offers") ||
          text.includes("mailchimp") ||
          className.includes("bannerContent") ||
          className.toLowerCase().includes("mailchimp")
        ) {
          removeElement(element);
        }
      }

      for (const element of Array.from(document.querySelectorAll("body *"))) {
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        const zIndex = Number.parseInt(style.zIndex, 10);
        if (
          (style.position === "fixed" || style.position === "absolute") &&
          Number.isFinite(zIndex) &&
          zIndex > 100 &&
          rect.width > window.innerWidth * 0.3 &&
          rect.height > window.innerHeight * 0.2
        ) {
          element.remove();
        }
      }
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }).catch(() => {});
  }
  await page.waitForTimeout(1800);
}

async function capture(page, project, url, filePath, scrollRatio = 0) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 22000 });
  await waitForReady(page);
  await waitForProjectContent(page, project);
  if (scrollRatio > 0) {
    await page.evaluate((ratio) => {
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      window.scrollTo({ top: Math.round(maxScroll * ratio), behavior: "instant" });
    }, scrollRatio);
    await page.waitForTimeout(600);
  }
  await page.screenshot({ path: filePath, fullPage: false });
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  const mobile = await browser.newContext({
    ...devices["iPhone 14 Pro"],
    deviceScaleFactor: 1,
  });

  for (const project of projects) {
    console.log(`${project.slug}: capturing`);
    const dir = path.join(outputRoot, project.slug);
    await mkdir(dir, { recursive: true });

    const desktopPage = await desktop.newPage();
    desktopPage.setDefaultTimeout(12000);
    await capture(desktopPage, project, project.url, path.join(dir, "hero-image.png"));

    const links = await collectLinks(desktopPage, project.url);
    const used = new Set([project.url]);

    for (const [fileName, matcher] of project.candidates) {
      const matched = links.find((link) => matcher.test(link.label) && !used.has(link.href));
      const url = matched?.href || project.url;
      used.add(url);
      const scrollRatio = matched ? 0 : fileName.includes("faq") || fileName.includes("cta") || fileName.includes("discovery") ? 0.58 : 0.32;
      await capture(desktopPage, project, url, path.join(dir, fileName), scrollRatio);
    }
    await desktopPage.close();

    const mobilePage = await mobile.newPage();
    mobilePage.setDefaultTimeout(12000);
    await capture(mobilePage, project, project.url, path.join(dir, "mobile-view.png"));
    await mobilePage.close();

    console.log(`${project.slug}: captured`);
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
